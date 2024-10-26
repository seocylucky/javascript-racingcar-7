import { Console, MissionUtils } from "@woowacourse/mission-utils";

class App {
  async run() {
    const cars = await inputCars();
    const count = await inputCount();
    const result = await racingCount(count, cars);

    Console.print("최종 우승자 : " + getWinners(cars, result));
  }
}

const inputCars = async () => {
  const inputCars = await Console.readLineAsync(
    "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n"
  );
  const cars = inputCars.split(",").map((car) => car.trim());

  return cars;
};

const inputCount = async () => {
  const count = await Console.readLineAsync("시도할 횟수는 몇 회인가요?\n");

  return count;
};

const randomNum = () => {
  return MissionUtils.Random.pickNumberInRange(0, 9);
};

const racingCar = async (cars, result, randomNumArr) => {
  for (let i = 0; i < cars.length; i++) {
    if (randomNumArr[i] >= 4) result[i] += 1;
    Console.print(`${cars[i]} : ${"-".repeat(result[i])}`);
  }
  Console.print("\n");
};

const racingCount = async (count, cars) => {
  let result = new Array(cars.length).fill(0);

  for (let i = 0; i < count; i++) {
    const randomNumArr = cars.map(() => randomNum());
    racingCar(cars, result, randomNumArr);
  }

  return result;
};

const getWinners = (cars, result) => {
  const maxScore = Math.max(...result);
  return cars.filter((_, index) => result[index] === maxScore).join(", ");
};

export default App;
