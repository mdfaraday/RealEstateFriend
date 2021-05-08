class Property {
    constructor (id, name, imageUri, description, address, purchaseCost, rehabCost, monthlyCost, maintCost, monthlyRent, reserveAmt, sqft, acres) {
        this.id = id
        this.name = name
        this.imageUri = imageUri
        this.description = description
        this.address = address
        this.purchaseCost = purchaseCost
        this.rehabCost = rehabCost
        this.monthlyCost = monthlyCost
        this.maintCost = maintCost
        this.monthlyRent = monthlyRent
        this.reserveAmt = reserveAmt
        this.sqft = sqft
        this.acres = acres
    }
}

export default Property

//need to keep adding new fields and also a field for WO's.