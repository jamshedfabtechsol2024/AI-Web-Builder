"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { FileIcon, FolderIcon, FolderOpenIcon } from "lucide-react";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const TreeContext = createContext(null);

const useTree = () => {
  const context = useContext(TreeContext);
  if (!context) {
    throw new Error("useTree must be used within a TreeProvider");
  }
  return context;
};

const Tree = forwardRef(
  (
    {
      className,
      elements,
      initialSelectedId,
      initialExpandedItems,
      children,
      indicator = true,
      openIcon,
      closeIcon,
      dir,
      onSelect,
      ...props
    },
    ref
  ) => {
    const [selectedId, setSelectedId] = useState(initialSelectedId);
    const [expandedItems, setExpandedItems] = useState(initialExpandedItems);

    const selectItem = useCallback(
      (id) => {
        setSelectedId(id);
        onSelect?.(id);
      },
      [onSelect]
    );

    const handleExpand = useCallback((id) => {
      setExpandedItems((prev) => {
        if (prev?.includes(id)) {
          return prev.filter((item) => item !== id);
        }
        return [...(prev ?? []), id];
      });
    }, []);

    const handleElementFound = useCallback((newPath, isSelectable) => {
      if (isSelectable) {
        setExpandedItems((prev) => [...(prev ?? []), ...newPath]);
      } else if (newPath.includes(newPath.at(-1))) {
        newPath.pop();
        setExpandedItems((prev) => [...(prev ?? []), ...newPath]);
      }
    }, []);

    const findParent = useCallback(
      (currentElement, selectId, currentPath = []) => {
        const isSelectable = currentElement.isSelectable ?? true;
        const newPath = [...currentPath, currentElement.id];

        if (currentElement.id === selectId) {
          handleElementFound(newPath, isSelectable);
          return;
        }

        if (
          isSelectable &&
          currentElement.children &&
          currentElement.children.length > 0
        ) {
          for (const child of currentElement.children) {
            findParent(child, selectId, newPath);
          }
        }
      },
      [handleElementFound]
    );

    const expandSpecificTargetedElements = useCallback(
      (treeElements, selectId) => {
        if (!(treeElements && selectId)) {
          return;
        }
        for (const element of treeElements) {
          findParent(element, selectId);
        }
      },
      [findParent]
    );

    useEffect(() => {
      if (initialSelectedId) {
        expandSpecificTargetedElements(elements, initialSelectedId);
      }
    }, [initialSelectedId, elements, expandSpecificTargetedElements]);

    const direction = dir === "rtl" ? "rtl" : "ltr";

    return (
      <TreeContext.Provider
        value={{
          selectedId,
          expandedItems,
          handleExpand,
          selectItem,
          setExpandedItems,
          indicator,
          openIcon,
          closeIcon,
          direction,
        }}
      >
        <div className={cn("size-full", className)}>
          <ScrollArea className="relative h-full px-2" dir={dir} ref={ref}>
            <AccordionPrimitive.Root
              {...props}
              className="flex flex-col gap-1"
              defaultValue={expandedItems}
              dir={dir}
              onValueChange={(value) =>
                setExpandedItems((prev) => [...(prev ?? []), value[0]])
              }
              type="multiple"
              value={expandedItems}
            >
              {children}
            </AccordionPrimitive.Root>
          </ScrollArea>
        </div>
      </TreeContext.Provider>
    );
  }
);

Tree.displayName = "Tree";

const TreeIndicator = forwardRef(({ className, ...props }, ref) => {
  const { direction } = useTree();

  return (
    <div
      className={cn(
        "absolute left-1.5 h-full w-px rounded-md bg-muted py-3 duration-300 ease-in-out hover:bg-slate-300 rtl:right-1.5",
        className
      )}
      dir={direction}
      ref={ref}
      {...props}
    />
  );
});

TreeIndicator.displayName = "TreeIndicator";

const Folder = forwardRef(
  ({
    className,
    element,
    value,
    isSelectable = true,
    isSelect,
    children,
    ...props
  }) => {
    const {
      direction,
      handleExpand,
      expandedItems,
      indicator,
      setExpandedItems,
      openIcon,
      closeIcon,
    } = useTree();

    return (
      <AccordionPrimitive.Item
        {...props}
        className="relative h-full overflow-hidden"
        value={value}
      >
        <AccordionPrimitive.Trigger
          className={cn(
            "flex items-center gap-1 rounded-md text-sm",
            className,
            {
              "rounded-md bg-muted": isSelect && isSelectable,
              "cursor-pointer": isSelectable,
              "cursor-not-allowed opacity-50": !isSelectable,
            }
          )}
          disabled={!isSelectable}
          onClick={() => handleExpand(value)}
        >
          {expandedItems?.includes(value)
            ? (openIcon ?? <FolderOpenIcon className="size-4" />)
            : (closeIcon ?? <FolderIcon className="size-4" />)}
          <span>{element}</span>
        </AccordionPrimitive.Trigger>
        <AccordionPrimitive.Content className="relative h-full overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          {element && indicator && <TreeIndicator aria-hidden="true" />}
          <AccordionPrimitive.Root
            className="ml-5 flex flex-col gap-1 py-1 rtl:mr-5"
            defaultValue={expandedItems}
            dir={direction}
            onValueChange={(accordionValue) => {
              setExpandedItems?.((prev) => [
                ...(prev ?? []),
                accordionValue[0],
              ]);
            }}
            type="multiple"
            value={expandedItems}
          >
            {children}
          </AccordionPrimitive.Root>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    );
  }
);

Folder.displayName = "Folder";

const File = forwardRef(
  (
    {
      value,
      className,
      handleSelect,
      isSelectable = true,
      isSelect,
      fileIcon,
      children,
      ...props
    },
    ref
  ) => {
    const { direction, selectedId, selectItem } = useTree();
    const isSelected = isSelect ?? selectedId === value;
    return (
      <button
        className={cn(
          "flex w-fit items-center gap-1 rounded-md pr-1 text-sm duration-200 ease-in-out rtl:pr-0 rtl:pl-1",
          {
            "bg-muted": isSelected && isSelectable,
          },
          isSelectable ? "cursor-pointer" : "cursor-not-allowed opacity-50",
          direction === "rtl" ? "rtl" : "ltr",
          className
        )}
        disabled={!isSelectable}
        onClick={() => selectItem(value)}
        ref={ref}
        type="button"
        {...props}
      >
        {fileIcon ?? <FileIcon className="size-4" />}
        {children}
      </button>
    );
  }
);

File.displayName = "File";

const CollapseButton = forwardRef(
  ({ className, elements, expandAll = false, children, ...props }, ref) => {
    const { expandedItems, setExpandedItems } = useTree();

    const expendAllTree = useCallback((treeElements) => {
      const expandTree = (element) => {
        const isSelectable = element.isSelectable ?? true;
        if (isSelectable && element.children && element.children.length > 0) {
          setExpandedItems?.((prev) => [...(prev ?? []), element.id]);
          for (const child of element.children) {
            expandTree(child);
          }
        }
      };

      for (const element of treeElements) {
        expandTree(element);
      }
    }, []);

    const closeAll = useCallback(() => {
      setExpandedItems?.([]);
    }, []);

    useEffect(() => {
      if (expandAll) {
        expendAllTree(elements);
      }
    }, [expandAll, expendAllTree, elements]);

    return (
      <Button
        className="absolute right-2 bottom-1 h-8 w-fit p-1"
        onClick={
          expandedItems && expandedItems.length > 0
            ? closeAll
            : () => expendAllTree(elements)
        }
        ref={ref}
        variant={"ghost"}
        {...props}
      >
        {children}
        <span className="sr-only">Toggle</span>
      </Button>
    );
  }
);

CollapseButton.displayName = "CollapseButton";

export { CollapseButton, File, Folder, Tree };
