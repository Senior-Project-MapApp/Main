import userData from "./example.json";
import TableGraph from "./tableGraph";

function Home () {
    return(
        <>
            <TableGraph data={userData}/>
        </>
    );
}

export default Home;