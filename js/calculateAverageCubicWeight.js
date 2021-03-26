class calculateAverageCubicWeight {
    constructor(cubicMeters){
        this.cubicMeters = cubicMeters;
    }
    //Calculate cubic meter using product length,width and height
    calculateCubicMeters (size) {
        if(size){
            let length = size.length / 100;
            let width = size.width /100;
            let height = size.height /100;
            this.cubicMeters = math.round((length * width * height),3);
        }
        return this.cubicMeters;
    }
    //Calculate Cubic Weight = Cubic Meter Multiplied by the conversion factor of 250 
    calculateACCubicWeight () {
        let cubicWeightInKg;        
        return cubicWeightInKg = this.cubicMeters * 250;
    }
    //Calculate average cubic weight 
    //parament : cubicWeightArray
    find_average(cubicWeightArray) {
        var sum = cubicWeightArray.reduce((result, current) => result + current, 0);
        return sum/cubicWeightArray.length;
      }
}