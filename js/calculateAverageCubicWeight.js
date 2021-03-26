class calculateAverageCubicWeight {
    constructor(cubicMeters){
        this.cubicMeters = cubicMeters;
    }
    calculateCubicMeters (size) {
        if(size){
            let length = size.length / 100;
            let width = size.width /100;
            let height = size.height /100;
            this.cubicMeters = math.round((length * width * height),3);
        }
        return this.cubicMeters;
    }
    calculateACCubicWeight () {
        let cubicWeightInKg;
        //console.log(this.cubicMeters);
        return cubicWeightInKg = this.cubicMeters * 250;
    }

    find_average(cubicWeightArray) {
        var sum = cubicWeightArray.reduce((result, current) => result + current, 0);
        return sum/cubicWeightArray.length;
      }
}