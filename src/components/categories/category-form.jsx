// src/components/categories/category-form.jsx
import React, { useState } from "react";
import CategoryIconField from "./CategoryIconField";

const CategoryForm = ({ onSubmit }) => {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // ⚠️ Check that onSubmit exists and is a function
    if (typeof onSubmit === "function") {
      onSubmit({ name: categoryName });
    } else {
      console.error("onSubmit prop is missing or not a function!");
    }

    setCategoryName("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Category Name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        className="border p-2 rounded"
      />

      <CategoryIconField /> {/* Icons selection */}

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Category
      </button>
    </form>
  );
};

export default CategoryForm;
