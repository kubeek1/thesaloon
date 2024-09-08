export function createCarLabels(list){
    let carLabels = list;

    for(let i=0; i<carLabels.length; i++){
        carLabels[i].value = carLabels[i]._id;
        carLabels[i].label = carLabels[i].brand + ' ' + carLabels[i].model + ' ' + carLabels[i].engine + ' ' + carLabels[i].year + ' ' + carLabels[i].color + '  ['+carLabels[i].plate+']';
    }

    return carLabels;
}

export function createCustomerLabels(list){
    let customerLabels = list;

    for(let j=0; j<customerLabels.length; j++){
        customerLabels[j].value = customerLabels[j]._id;
        customerLabels[j].label = customerLabels[j].phone + ' - ' + customerLabels[j].name + ' ' + customerLabels[j].surname;
    }

    return customerLabels;
}