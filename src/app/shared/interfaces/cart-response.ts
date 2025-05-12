export interface CartResponse {
    "status": string,
    "message": string,
    "numOfCartItems": number,
    "cartId": string,
    "data": {
        "_id": string,
        "cartOwner": string,
        "products": [
            {
                "count": number,
                "_id": string,
                "product": string,
                "price": number
            }
        ],
        "createdAt": string,
        "updatedAt": string,
        "__v": number,
        "totalCartPrice": number
}
}

export interface CartFailedResponse{
    "statusMsg": string,
    "message": string
}