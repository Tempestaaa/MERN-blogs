import { Button } from "flowbite-react";

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-between items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-between flex flex-col">
        <h2 className=" text-2xl ">Want to learn more about React?</h2>
        <p className="text-gray-500 my-2">
          Check out these resources with 100 React Projects
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none rounded-br-xl rounded-tr-none"
        >
          <a href="#" target="_blank" rel="noopener noreferrer">
            Learn More
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1 grid place-items-center">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnsNPQkpDVpbVf97Ih5C81Q_yPNZ-HUS3Up1_AjCoS_g&s" />
      </div>
    </div>
  );
};

export default CallToAction;
