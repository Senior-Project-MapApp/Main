import userData from "./example.json";
import TableGraph from "./tableGraph";

function Home ({data}) {
    return(
        <>
            <TableGraph data={data}/>
        </>
    );
}

export default Home;