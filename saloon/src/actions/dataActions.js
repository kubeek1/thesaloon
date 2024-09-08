import fetch from 'isomorphic-fetch';

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_VERCEL_URL
    : "http://localhost:9000/api/";

//Reservations
export function fetchReservations() {
    return fetch(BASE_URL + 'reservations/search')
    .then(r => r.json())
    .catch(e => console.error(e));
}

export function fetchReservationsByCarID(id) {
    return fetch(BASE_URL + 'reservations/searchByCarId/' + id)
        .then(r => r.json())
        .catch(e => console.error(e));
}

export function fetchReservation(id) {
    return fetch(BASE_URL + 'reservations/search/' + id)
    .then(r => r.json())
    .catch(e => console.error(e));
}

export function createReservation(data) {
    return fetch(BASE_URL + 'reservations/add', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(r => r)
    .catch(e => console.error(e));
}

export function updateReservation(id, data) {
    return fetch(BASE_URL + 'reservations/change/' + id, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(r => r)
    .catch(e => console.error(e));

}

export function deleteReservation(id) {
    return fetch(BASE_URL + 'reservations/delete/' + id, {
        method: 'DELETE'
    })
    .then(r => r)
    .catch(e => console.error(e));
}


//Customers
export function fetchCustomers() {
    return fetch(BASE_URL + 'customers/search')
    .then(r => r.json())
    .catch(e => console.error(e));
}

export function fetchCustomer(id) {
    return fetch(BASE_URL + 'customers/search/' + id)
    .then(r => r.json())
    .catch(e => console.error(e));
}

export function createCustomer(data) {
    return fetch(BASE_URL + 'customers/add', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(r => r)
    .catch(e => console.error(e));
}

export function updateCustomer(id, data) {
    return fetch(BASE_URL + 'customers/change/' + id, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(r => r)
    .catch(e => console.error(e));
}

export function deleteCustomer(id) {
    return fetch(BASE_URL + 'customers/delete/' + id, {
        method: 'DELETE'
    })
    .then(r => r)
    .catch(e => console.error(e));
}

export function fetchCustomerPhone(phone) {
    return fetch(BASE_URL + 'customers/searchPhone/' + phone)
        .then(r => r.json())
        .catch(e => console.error(e));
}

//Cars
export function fetchCars() {
    return fetch(BASE_URL + 'cars/search')
    .then(r => r.json())
    .catch(e => console.error(e));
}

export function fetchCar(id) {
    return fetch(BASE_URL + 'cars/search/' + id)
    .then(r => r.json())
    .catch(e => console.error(e));
}

export function fetchCarPlate(plate) {
    return fetch(BASE_URL + 'cars/searchPlate/' + plate)
    .then(r => r.json())
    .catch(e => console.error(e));
}

export function createCar(data) {
     return fetch(BASE_URL + 'cars/add', {
         method: 'POST',
         body: JSON.stringify(data),
         headers: {
             'Content-Type': 'application/json'
         }
     })
     .then(r => r)
     .catch(e => console.error(e));
 }

export function updateCar(id, data) {
    return fetch(BASE_URL + 'cars/change/' + id, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(r => r)
    .catch(e => console.error(e));
}

export function deleteCar(id) {
    return fetch(BASE_URL + 'cars/delete/' + id, {
        method: 'DELETE',
    })
    .then(r => r)
    .catch(e => console.error(e));
}

// Incidents
export function fetchIncidents() {
    return fetch(BASE_URL + 'incidents/search')
    .then(r => r.json())
    .catch(e => console.error(e));
}

export function fetchIncident(id) {
    return fetch(BASE_URL + 'incidents/search/' + id)
    .then(r => r.json())
    .catch(e => console.error(e));
}

export function createIncident(data) {
     return fetch(BASE_URL + 'incidents/add', {
         method: 'POST',
         body: JSON.stringify(data),
         headers: {
             'Content-Type': 'application/json'
         }
     })
     .then(r => r)
     .catch(e => console.error(e));
 }

export function updateIncident(id, data) {
    return fetch(BASE_URL + 'incidents/change/' + id, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(r => r)
    .catch(e => console.error(e));
}

export function deleteIncident(id) {
    return fetch(BASE_URL + 'incidents/delete/' + id, {
        method: 'DELETE'
    })
    .then(r => r)
    .catch(e => console.error(e));
}

// Authorization
export function authUser(l, pw) {
    return fetch(BASE_URL + 'auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                    login: l,
                    password: pw
        })
    })
    .then(r => r)
    .catch(e => console.error(e));
}

export function fetchFeed() {
    return fetch(BASE_URL + 'reservations/getfeed')
        .then(r => r.json())
        .catch(e => console.error(e));
}