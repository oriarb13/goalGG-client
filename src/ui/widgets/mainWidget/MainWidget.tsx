import { useAppSelector } from "@/store/store";

const MainWidget = () => {
  const { user } = useAppSelector((state) => state.user);
  console.log(user);

  if (!user) {
    return <div>Loading...</div>;
  }
  return <div>MainWidget</div>;
};

export default MainWidget;
