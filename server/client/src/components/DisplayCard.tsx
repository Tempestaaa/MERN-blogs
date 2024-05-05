import { HiArrowNarrowUp } from "react-icons/hi";
import { displayTypes } from "../types/display.type";

type propTypes = {
  item: displayTypes;
};

const DisplayCard = ({ item }: propTypes) => {
  const Icon = item.icon;

  return (
    <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
      <div className="flex justify-between">
        <div>
          <h3 className="text-gray-500 text-md uppercase">
            Total {item.label}
          </h3>
          <p className="text-2xl">{item.total}</p>
        </div>
        <Icon className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
      </div>

      <div className="flex gap-2 text-sm">
        <span className="text-green-500 flex items-center">
          <HiArrowNarrowUp />
          {item.lastMonth}
        </span>
        <div className="text-gray-500">Last month</div>
      </div>
    </div>
  );
};

export default DisplayCard;
