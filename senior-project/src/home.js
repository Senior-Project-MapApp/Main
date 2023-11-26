import data from "./example.json";
import TableGraph from "./tableGraph";

function Home () {
    return(
        <>
            <TableGraph data={data}/>
        </>
    );
}

export default Home;