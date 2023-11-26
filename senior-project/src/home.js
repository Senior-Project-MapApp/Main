import data from "./example.json";
import TableGraph from "./tableGraph";

function Home () {
    return(
        <>
        Home sweet home
        <TableGraph data={data}/>
        </>
    );
}

export default Home;