import { ClipLoader } from "react-spinners";

const Spinner = () => (
    <div className="flex justify-center items-center mt-4">
        <ClipLoader color="#2563eb" size={50} />
        <p className="text-blue-500 font-medium mt-2">Creating your short URL...</p>
    </div>
);

export default Spinner;