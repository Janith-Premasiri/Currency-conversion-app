import React ,{useEffect, useState} from 'react'
import axios from "axios";
export default function MainPage() {

    //states for the form fields

const[date, setDate] = useState("");
const[sourceCurrency,setSourceCurrency] = useState("");
const[targetCurrency,setTargetCurrency] = useState("");
const[amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
const[amountiInTargetCurrency, setAmountInTargetCurrency] = useState(0);
const[currencyNames , setCurrencyNames] = useState([])
const[loading, setLoading] = useState(true);


//handleSubmit mechode
const handleSubmit=async(e) => {
    e.preventDefault();
    console.log(
        date,
        sourceCurrency,
        targetCurrency,
        amountInSourceCurrency
    );

    try{
        const responce = await axios.get("http://localhost:5000/convert" , {
            params:{
                date,
                sourceCurrency,
                targetCurrency,
                amountInSourceCurrency,
            }
        });

    setAmountInTargetCurrency(responce.data);
    setLoading(false);

    }catch(err){
        console.error(err);
    }
};

//get all currency names
useEffect(()=>{
    const getCurrencyNames = async()  => {
        try{
            const responce = await axios.get(
                "http://localhost:5000/getAllCurrencies"
                                    
            );
            setCurrencyNames(responce.data);
        }catch(err){
            console.error(err);
        }
    }
    getCurrencyNames();
},[])


return (
    <div>
        <h1 className='lg:mx-32 text-5xl font-bold text-green-500' > Convert Your Currencires Today </h1>
        <p className='lg:mx-32 opacity-40 py-6'>
            Welcome to "Convert Your Currencires Today"! This application allows you
             to easily convert currencies based on the latest exchange rates. Whether 
             you are planning to trip, managing your finances, or simply curious about 
             the value of your money in different currencies, this tool is here to 
             help.
        </p>

        <div className='mt-5 flex items-center justify-center'>
            <section className='w-full lg:w-1/2'>
                <form onSubmit={handleSubmit}>
                    
                    <div className="mb-6">
                    <label for={date} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Date </label>
                    <input
                    onChange={(e)=>setDate(e.target.value)} 
                    type="Date" 
                    id={date} 
                    name={date}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="name@flowbite.com" required />
                    </div>
                    
                    <div className="mb-6">
                    <label for={sourceCurrency}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Source Currency </label>
                    <select
                    onChange={(e)=>setSourceCurrency(e.target.value)} 
                    name={sourceCurrency} 
                    id={sourceCurrency}
                    value={sourceCurrency}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" >

                    <option value="">Select source currency</option>
                    {Object.keys(currencyNames).map((currency) => (
                        <option className='p-1' key={currency}  value={currency}>
                            {currencyNames[currency]}
                        </option>
                    ))}

                    </select>
                    </div>

                    <div className="mb-6">
                    <label for={targetCurrency}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Target Currency </label>
                    <select 
                    onChange={(e)=>setTargetCurrency(e.target.value)}
                    name={targetCurrency} 
                    id={targetCurrency}
                    value={targetCurrency}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" >

                    <option value="">Select target currency</option>
                    {Object.keys(currencyNames).map((currency) => (
                        <option className='p-1' key={currency}  value={currency}>
                            {currencyNames[currency]}
                        </option>
                    ))}

                    </select>
                    </div>



                    <div className="mb-6">
                    <label for={amountInSourceCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Amount in source currency </label>
                    <input
                    onChange={(e)=>setAmountInSourceCurrency(e.target.value)} 
                    type="number" 
                    id={amountInSourceCurrency} 
                    name={amountInSourceCurrency}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Amount in source currency" required />
                    </div>

                    <button  className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md'>Get the target Currency</button>
                    
                </form>

            </section>

        </div>
      {!loading ? (
      <section className='mt-5 lg:mx-72'>

      {amountInSourceCurrency} {currencyNames[sourceCurrency]} is equals to {""}
      <span className='text-green-500 font-bold'>{amountiInTargetCurrency} </span> in {currencyNames[targetCurrency]}

      </section>

      ) : (
        null
      )}
    </div>

        

    

    
  )
}
