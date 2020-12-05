import React , {useState,useEffect} from 'react';
import axios from 'axios'
import { Table } from 'reactstrap';

const EmployeeResult = () =>{

    const [test,setTest] = useState([]);
    const [user,setUser] = useState({});


    useEffect(() =>{
        getResults();
    },[])


    const getResults = async () =>{


        //getting logged in user's info
        let userInfo = await axios.get("/api/employees/getInfo",{withCredentials:true});
        console.log(userInfo);
        setUser(userInfo.data);


        //get all the tests in which this employee has
        console.log(user)
        let tests = await axios.get(`/api/tests/getTests/${userInfo.data._id}`,{withCredentials:true})
        // if (tests.data) setTest(tests.data)

        console.log(tests)

        //for each test, find the pools they are in and for each pools,find the well and get result
        await Promise.all(tests.data.map(async (element) => {
            await Promise.all(element.pools.map(async (pool)=>{
                console.log("checking for pool "+pool)
                //make api call for the given pool to get the well
                let res = await axios.get(`/api/pools/${pool}`)
                console.log("well that this pool got :")
                console.log(res.data)


                //with the well we got, find the well and get result
                let well = await axios.get(`/api/wells/${res.data.well_id}`)
                let finalResult = well.data ? well.data.result:null
                console.log(finalResult)
                element.result = finalResult ? finalResult:"Not assigned"

            }))
        }));

        console.log(tests.data)
        setTest(tests.data)


    }










    return(
        <>
            <h1>Welcome to employee result</h1>

            <h2>{user._id}</h2>

            <Table>
                <thead>
                    <tr>
                        <th>Collection Date</th>
                        <th>Result</th>
                    </tr>
                </thead>

                <tbody>
                    {test.map((element) => 

                        <>
                            <tr>
                                <td>{element.collectionTime}</td>
                                <td>{element.result}</td>
                            </tr>
                        </>
                    )}
                </tbody>

            </Table>


        </>
    )
}

export default EmployeeResult;