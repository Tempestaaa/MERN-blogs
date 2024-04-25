import { useSelector } from "react-redux";
import { RootState } from "../services/store";

type Props = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  return (
    <div className={theme}>
      <div className="bg-white text-black dark:bg-black dark:text-white ">
        {children}
      </div>
    </div>
  );
};

export default ThemeProvider;
