import axios from "axios";
import { useState } from "react";
import Spinner from "./components/Spinner";

function App() {
  const [spinner, showSpinner] = useState(false)
  const [data, setData] = useState([])
  const [code, setCode] = useState(0)
  const [filterData, setFilterData] = useState([])
  const [message, setMessage] = useState('')


  const handleGetData = async () => {
    try {
      showSpinner(true);
      if (code) {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${code}`);
        setMessage(response.data[0].Message)
        setData(response.data[0]);
        showSpinner(false);
      }
    } catch (err) {
      console.log(err);
      showSpinner(false);
    }
  }

  const handleFilter = (e) => {
    let filter = e.target.value;
    if (filter?.trim()) {
      let res = data?.PostOffice?.filter((state) => {
        return state?.Name?.toLowerCase().includes(filter.toLowerCase()) ||
          state?.BranchType?.toLowerCase().includes(filter.toLowerCase()) ||
          state?.District?.toLowerCase().includes(filter.toLowerCase()) ||
          state?.Division?.toLowerCase().includes(filter.toLowerCase())
      });
      setFilterData(res);
    } else {
      setFilterData([])
    }
  }

  return (
    <section className="container">
      <section className="container my-4">
        <div className={!data?.Message ? "d-none" : ""}>
          <h4>Pincode: {code}</h4>
          <b>Message:</b><span> {data?.Message}</span>
        </div>

        {/* Form */}
        {!message && message !== 'No records found' ? (
          <section>
            <form onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="pincode" className="form-label mb-1">Enter Pincode</label>
              <input type="number" className="form-control border-dark" placeholder="Pincode" onChange={(e) => setCode(e.target.value)} />
              <div className="mt-3">
                <button className="btn btn-dark px-6" onClick={() => handleGetData()}>Lookup</button>
              </div>
            </form>
          </section>
        ) : (
          <section className="mt-5">
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="text" className="form-control border-dark" placeholder="Filter" onChange={(e) => handleFilter(e)} />
            </form>
          </section>
        )}

        {/* Fech Data */}
        {/* Initially storing the data in data state anf after fetchinf the filtered data storing
       in filteredData according to the condition Fetching the data */}
        {filterData?.length === 0 && data?.PostOffice?.length > 0 ?
          <div className="mt-4">
            <Spinner show={spinner}>
              <div className="row gap-5 mx-1 align-items-center">
                {data?.PostOffice?.map((state, index) => (
                  <div key={index} className={`col-md-5 border border-dark rounded p-4 ${index % 2 === 0 ? "me-auto" : "ms-auto"}`}>
                    <div>
                      <b>Name:</b> {state?.Name}
                    </div>
                    <div>
                      <b>Branch Type: </b>{state?.BranchType}
                    </div>
                    <div>
                      <b>Delivery Status: </b>{state?.DeliveryStatus}
                    </div>
                    <div>
                      <b>District: </b>{state?.District}
                    </div>
                    <div>
                      <b>Division: </b>{state?.Division}
                    </div>
                  </div>
                ))}
              </div>
            </Spinner>
          </div> :
          <div className="mt-4">
            <div className="row gap-3 mx-auto">
              {filterData?.map((state, index) => (
                <div key={index} className={`col-md-5 border border-dark rounded p-4 ${index % 2 === 0 ? "me-auto" : "ms-auto"}`}>
                  <div>
                    <b>Name:</b> {state?.Name}
                  </div>
                  <div>
                    <b>Branch Type: </b>{state?.BranchType}
                  </div>
                  <div>
                    <b>Delivery Status: </b>{state?.DeliveryStatus}
                  </div>
                  <div>
                    <b>District: </b>{state?.District}
                  </div>
                  <div>
                    <b>Division: </b>{state?.Division}
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      </section>
    </section>
  );
}

export default App;
