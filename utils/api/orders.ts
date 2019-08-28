import axios from 'axios';

export const fetchOrderById = async (id:string) => {
    try {
        const { data } = await axios.get(
                                process.env.API_ROOT_URL+`/orders/${id}.json`,
                                { headers: {"Authorization" : `Bearer ${process.env.DEV_TOKEN}`}});
        
        return data.order;
    }catch(e) {
        console.log(e);
    }
}