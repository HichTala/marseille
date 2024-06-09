import {PostForm} from "@/app/ui/forms";

export function Post() {


    return (
        <div className="p-3">
            <h1 className="text-5xl font-black md:font-extrabold font-sans text-cente">Poster une vacation</h1>
            <PostForm />
        </div>
    )
}