import { Pencil, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import CentralInput from "@/components/auth/central-input";
import PrimaryButton from "@/components/buttons/primary-button";
import UploadCoverCard from "@/components/card/upload-cover-card";
import { useImageUpload } from "@/hooks/use-image-upload";

const AddPortfolio = ({ initialProjects = [], onSubmitPortfolio }) => {
  const [form, setForm] = useState({
    projectName: "",
    description: "",
    errors: {
      projectName: "",
      description: "",
    },
  });

  const [portfolioPhoto, setPortfolioPhoto] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Dummy initial projects
  const [projects, setProjects] = useState([]);

  // handle file selection
  const handlePortfolioSelect = useCallback((selectedFileOrUrl) => {
    setPortfolioPhoto(selectedFileOrUrl);
  }, []);

  const { mutate: uploadImage, isPending: isUploading } = useImageUpload();

  // handle input change
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      errors: { ...prev.errors, [name]: "" },
    }));
  }, []);

  // validation rules
  const rules = {
    projectName: {
      min: 2,
      max: 100,
      message: {
        min: "Project name must be at least 2 characters.",
        max: "Project name must be less than 100 characters.",
      },
    },
    description: {
      min: 5,
      max: 300,
      message: {
        min: "Description must be at least 5 characters.",
        max: "Description must be less than 300 characters.",
      },
    },
  };

  // validate form
  const validate = useCallback(() => {
    let valid = true;
    const newErrors = {};

    Object.entries(rules).forEach(([field, { min, max, message }]) => {
      const value = form[field].trim();
      if (value.length < min) {
        newErrors[field] = message.min;
        valid = false;
      } else if (value.length > max) {
        newErrors[field] = message.max;
        valid = false;
      }
    });

    if (!portfolioPhoto) {
      toast.error("Portfolio image is required!");
      valid = false;
    }

    setForm((prev) => ({ ...prev, errors: { ...prev.errors, ...newErrors } }));
    return valid;
  }, [form]);

  // reset form
  const resetForm = () => {
    setForm({
      projectName: "",
      description: "",
      errors: { projectName: "", description: "" },
    });
    setPortfolioPhoto(null);
    setEditingId(null);
  };

  // submit handler
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!validate()) return;

      // ✅ check uniqueness by projectName
      const nameExists =
        !editingId &&
        projects.some(
          (p) => p.projectName.toLowerCase() === form.projectName.toLowerCase()
        );

      if (nameExists) {
        toast.error("A project with this name already exists!");
        return;
      }

      const processSave = (imageUrl) => {
        setProjects((prev) => {
          let updated;
          if (editingId) {
            // merge with existing project
            updated = prev.map((p) =>
              p.projectName === editingId
                ? {
                    ...p,
                    projectName: form.projectName,
                    description: form.description,
                    image: imageUrl,
                  }
                : p
            );
          } else {
            // new project
            updated = [
              {
                projectName: form.projectName,
                description: form.description,
                image: imageUrl,
              },
              ...prev,
            ];
          }

          onSubmitPortfolio?.(updated);
          return updated;
        });

        resetForm();
      };

      if (portfolioPhoto instanceof File) {
        uploadImage(portfolioPhoto, {
          onSuccess: (response) => {
            processSave(response?.profile_image);
          },
          onError: (error) => {
            console.error("Error uploading image:", error);
          },
        });
      } else {
        processSave(
          portfolioPhoto ||
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=60"
        );
      }
    },
    [
      form,
      portfolioPhoto,
      editingId,
      validate,
      projects,
      onSubmitPortfolio,
      uploadImage,
    ]
  );

  // edit project
  const handleEdit = (e, project) => {
    e.preventDefault();
    setEditingId(project.projectName);
    setForm({
      ...(project?.id ? { id: project?.id } : {}),
      projectName: project.projectName,
      description: project.description,
      errors: { projectName: "", description: "" },
    });
    setPortfolioPhoto(project.image);
  };

  const handleDelete = (projectName) => {
    setProjects((prev) => {
      const updated = prev.filter((p) => p.projectName !== projectName);
      onSubmitPortfolio?.(updated);
      return updated;
    });
    if (editingId === projectName) resetForm();
  };

  // config for inputs
  const inputs = [
    {
      name: "projectName",
      label: "Project Name",
      placeholder: "Type here",
    },
    {
      name: "description",
      label: "Short Description",
      placeholder: "Type here",
    },
  ];

  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  return (
    <div>
      {/* Portfolio List */}
      <h2 className="mb-4 font-semibold text-lg">My Portfolio</h2>
      {projects.length === 0 && (
        <p className="my-2 text-center text-gray-400">No projects added yet.</p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            className="group relative rounded-2xl border border-white/10 bg-white/5 p-4 shadow-md transition hover:shadow-lg"
            key={project.projectName}
          >
            <img
              alt={project.projectName}
              className="mb-3 h-40 w-full rounded-xl object-cover"
              src={project.image || ""}
            />

            <h3 className="font-semibold text-base">{project.projectName}</h3>
            <p className="line-clamp-2 text-gray-400 text-sm">
              {project.description}
            </p>

            {/* Action buttons */}
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 transition group-hover:opacity-100">
              <button
                className="rounded-full bg-blue-500 p-2 text-white shadow hover:bg-blue-600"
                onClick={(e) => handleEdit(e, project)}
              >
                <Pencil size={16} />
              </button>
              <button
                className="rounded-full bg-red-500 p-2 text-white shadow hover:bg-red-600"
                onClick={() => handleDelete(project.projectName)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Portfolio Form */}
      <h1 className="mt-10 mb-2 border-white/10 border-b pb-2 font-medium text-lg">
        {editingId ? "Edit Project" : "Add Portfolio"}
      </h1>

      <UploadCoverCard
        defaultImage={portfolioPhoto}
        onFileSelect={handlePortfolioSelect}
        text="to upload your portfolio"
      />

      <div className="mt-4 grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
        {inputs.map(({ name, label, placeholder }) => (
          <CentralInput
            error={form.errors[name]}
            key={name}
            label={label}
            name={name}
            onChange={handleChange}
            placeholder={placeholder}
            type="text"
            value={form[name]}
          />
        ))}
      </div>

      <div className="flex items-center justify-end gap-3">
        {editingId && (
          <PrimaryButton
            className="mt-4 bg-gray-500 px-8 font-medium text-sm 2xl:text-lg"
            onClick={resetForm}
            title="Cancel"
            type="button"
          />
        )}
        <PrimaryButton
          className="mt-4 bg-[var(--dark-blue)] px-8 font-medium text-sm 2xl:text-lg"
          loading={isUploading}
          onClick={handleSubmit}
          title={editingId ? "Update Project" : "Save Project"}
          type="button"
        />
      </div>
    </div>
  );
};

export default AddPortfolio;
