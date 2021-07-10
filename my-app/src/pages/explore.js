import Explore from "../components/Explore/Explore";

function explore(props) {
  const { user } = props;
  return (
    <div>
      <Explore user={user} />
    </div>
  );
}

export default explore;
