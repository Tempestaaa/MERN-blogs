import { LibraryBig, Plus } from "lucide-react";
import { useCreateBlogMutation } from "../services/blogApi";
import AddForm from "./AddForm";
import { useState } from "react";

const Nav = () => {
  // const { blog } = useCreateBlogMutation();
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <nav className="py-3">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* LOGO */}
        <div className="flex items-center gap-1 font-bold text-2xl italic">
          <LibraryBig />
          <span>MyBlog</span>
        </div>

        {/* CONTROLLERS */}
        <div className="flex items-center gap-2 relative">
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="bg-secondary rounded-md py-1 px-2 flex items-center gap-1 hover:bg-white/30"
          >
            <Plus />
            <span>Add</span>
          </button>
          {isFormOpen && <AddForm />}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
