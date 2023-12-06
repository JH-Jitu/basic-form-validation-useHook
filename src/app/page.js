"use client";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const RegistrationForm = () => {
  const {
    control,
    handleSubmit,
    setError,
    register,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    const {
      name,
      username,
      email,
      password,
      nationalId,
      photo,
      role,
      permissions,
    } = data;

    if (name.length < 4) {
      setError("name", {
        type: "manual",
        message: "Name must be at least 4 characters",
      });
      return;
    }

    if (!/^[a-z0-9]+$/.test(username)) {
      setError("username", {
        type: "manual",
        message: "Username must contain only lowercase letters and numbers",
      });
      return;
    }

    if (!/^[a-zA-Z0-9._-]+@deveteam\.admin\.com$/.test(email)) {
      setError("email", { type: "manual", message: "Invalid email address" });
      return;
    }

    if (password.length < 8 || !/[A-Z]/.test(password)) {
      setError("password", {
        type: "manual",
        message:
          "Password must be 8 characters and contain at least 1 uppercase letter",
      });
      return;
    }

    if (nationalId.length !== 10) {
      setError("nationalId", {
        type: "manual",
        message: "Invalid National ID",
      });
      return;
    }

    console.log({ photo, previewImage });
    if (!previewImage || !previewImage[0]) {
      setError("photo", {
        type: "manual",
        message: "Please select a photo.",
      });
      return;
    }

    const allowedImageTypes = ["image/jpeg", "image/png"];
    if (
      previewImage[0]?.type &&
      !allowedImageTypes.includes(previewImage[0].type)
    ) {
      setError("photo", {
        type: "manual",
        message: "Invalid photo format. Please use JPEG or PNG.",
      });
      return;
    }

    if (previewImage[0]?.size && previewImage[0].size > 1024 * 1024) {
      setError("photo", {
        type: "manual",
        message: "Photo size must be less than 1 MB.",
      });
      return;
    }

    if (!role) {
      setError("role", { type: "manual", message: "Role is required" });
      return;
    }

    if (permissions.length < 2) {
      setError("permissions", {
        type: "manual",
        message: "Select at least 2 permissions",
      });
      return;
    }
    router.push("/success");
  };

  const generateRandomPassword = () => {
    const randomPassword = Math.random()
      .toString(36)
      .slice(2, 10)
      .toUpperCase();
    document.getElementById("password").value = randomPassword;
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto mt-8 relative bg-white p-8 rounded shadow-md w-full"
        noValidate
      >
        <h1 className="text-4xl font-bold mb-4 text-[red]">Create a Admin</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Name is required",
              minLength: {
                value: 4,
                message: "Name must be at least 4 characters",
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter your name"
                className="p-2 border border-gray-300 w-full"
              />
            )}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <Controller
            name="username"
            control={control}
            rules={{
              required: "Username is required",
              pattern: {
                value: /^[a-z0-9]+$/,
                message:
                  "Username must contain only lowercase letters and numbers",
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter your username"
                className="p-2 border border-gray-300 w-full"
              />
            )}
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@deveteam\.admin\.com$/,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                placeholder="Enter your email"
                className="p-2 border border-gray-300 w-full"
              />
            )}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <div className="flex">
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="p-2 border border-gray-300 w-full"
                />
              )}
            />
            <button
              type="button"
              onClick={generateRandomPassword}
              className="bg-[red] text-white py-2 px-4 rounded mr-2"
            >
              Generate Password
            </button>
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-0 text-gray-500 text-2xl"
            >
              {showPassword ? "🫣" : "🫢"}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            National ID
          </label>
          <Controller
            name="nationalId"
            control={control}
            rules={{
              required: "National ID is required",
              pattern: { value: /^[0-9]{10}$/, message: "Invalid National ID" },
            }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter your National ID"
                className="p-2 border border-gray-300 w-full"
              />
            )}
          />
          {errors.nationalId && (
            <span className="text-red-500 text-sm">
              {errors.nationalId.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Photo
          </label>
          <Controller
            name="photo"
            control={control}
            // rules={{
            //   required: "Photo is required",
            // }}
            render={({ field }) => (
              <input
                {...field}
                type="file"
                onChange={handlePhotoChange}
                accept=".jpg, .jpeg, .png"
                className="p-2 border border-gray-300 w-full"
              />
            )}
          />
          {previewImage && (
            <div className="mb-4">
              {previewImage && (
                <div className="mt-2 w-20 h-20">
                  <Image
                    src={previewImage}
                    alt="Selected Avatar"
                    width={100}
                    height={100}
                  />
                </div>
              )}
            </div>
          )}
          {errors.photo && (
            <span className="text-red-500 text-sm">{errors.photo.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Role
          </label>
          <div>
            <label className="mr-4">
              <input
                type="radio"
                value="executive"
                {...register("role", { required: "Role is required" })}
              />{" "}
              Executive
            </label>
            <label>
              <input
                type="radio"
                value="moderator"
                {...register("role", { required: "Role is required" })}
              />{" "}
              Moderator
            </label>
          </div>
          {errors.role && (
            <span className="text-red-500 text-sm">{errors.role.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Permissions
          </label>
          <div>
            <label className="mr-4">
              <input
                type="checkbox"
                {...register("permissions")}
                value="creating"
              />{" "}
              Creating
            </label>
            <label className="mr-4">
              <input
                type="checkbox"
                {...register("permissions")}
                value="adding"
              />{" "}
              Adding
            </label>
            <label>
              <input
                type="checkbox"
                {...register("permissions")}
                value="deleting"
              />{" "}
              Deleting
            </label>
          </div>
          {errors.permissions && (
            <span className="text-red-500 text-sm">
              {errors.permissions.message}
            </span>
          )}
        </div>

        <div className="mb-4 relative">
          <button
            type="submit"
            className="bg-[red] text-white py-2 px-4 rounded relative w-[100%] font-bold"
          >
            Create Admin
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
