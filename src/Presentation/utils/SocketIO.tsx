import io from 'socket.io-client';

const socket = io('https://jpz-stutz-production.up.railway.app/orders/delivery');
// const socket = io('http://192.168.0.105:3000/orders/delivery');
export default socket;