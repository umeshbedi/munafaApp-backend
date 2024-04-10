function customerID() {
    const min = 1000000000;
    const max = 9999999999;
    const tempID = Math.floor(Math.random() * (max - min + 1)) + min;
    return tempID

}

function orderID() {
    const randomString = Math.random().toString(36).substring(2, 12);
    return randomString;
}

export const oID = orderID()
export const cID = customerID()