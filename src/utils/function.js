// Importing constants from a module
import { EXERCISES, SCHEMES, TEMPOS, WORKOUTS } from "./workout_info.js";

// Flattens the exercises object to simplify lookup
const exercises = exercisesFlattener(EXERCISES);

// Function to generate a workout based on input arguments
export function generateWorkout(args) {
    // Destructuring arguments
    const { muscles, poison: workout, goal } = args;

    // Filtering exercises that are not for home environment
    let exer = Object.keys(exercises);
    exer = exer.filter((key) => exercises[key].meta.environment !== "home");

    // Tracking included exercises
    let includedTracker = [];

    // Default number of sets
    let numSets = 5;

    // Initializing list of muscles based on workout type
    let listOfMuscles;
    if (workout === "individual") {
        listOfMuscles = muscles;
    } else {
        listOfMuscles = WORKOUTS[workout][muscles[0]];
    }

    // Shuffling the list of muscles
    listOfMuscles = new Set(shuffleArray(listOfMuscles));
    let arrOfMuscles = Array.from(listOfMuscles);

    // Determining the workout scheme based on goal
    let scheme = goal;

    // Generating sets based on the workout scheme
    let sets = SCHEMES[scheme].ratio
        .reduce((acc, curr, index) => {
            return [
                ...acc,
                ...[...Array(parseInt(curr)).keys()].map((val) =>
                    index === 0 ? "compound" : "accessory"
                ),
            ];
        }, [])
        .reduce((acc, curr, index) => {
            const muscleGroupToUse =
                index < arrOfMuscles.length
                    ? arrOfMuscles[index]
                    : arrOfMuscles[index % arrOfMuscles.length];
            return [
                ...acc,
                {
                    setType: curr,
                    muscleGroup: muscleGroupToUse,
                },
            ];
        }, []);

    // Separating compound and accessory exercises
    const { compound: compoundExercises, accessory: accessoryExercises } =
        exer.reduce(
            (acc, curr) => {
                let exerciseHasRequiredMuscle = false;
                for (const musc of exercises[curr].muscles) {
                    if (listOfMuscles.has(musc)) {
                        exerciseHasRequiredMuscle = true;
                    }
                }
                return exerciseHasRequiredMuscle
                    ? {
                        ...acc,
                        [exercises[curr].type]: {
                            ...acc[exercises[curr].type],
                            [curr]: exercises[curr],
                        },
                    }
                    : acc;
            },
            { compound: {}, accessory: {} }
        );

    // Generating workout of the day (WOD)
    const genWOD = sets.map(({ setType, muscleGroup }) => {
        const data =
            setType === "compound" ? compoundExercises : accessoryExercises;
        const filteredObj = Object.keys(data).reduce((acc, curr) => {
            if (
                includedTracker.includes(curr) ||
                !data[curr].muscles.includes(muscleGroup)
            ) {
                return acc;
            }
            return { ...acc, [curr]: exercises[curr] };
        }, {});
        const filteredDataList = Object.keys(filteredObj);
        const filteredOppList = Object.keys(
            setType === "compound" ? accessoryExercises : compoundExercises
        ).filter((val) => !includedTracker.includes(val));

        let randomExercise =
            filteredDataList[
            Math.floor(Math.random() * filteredDataList.length)
            ] ||
            filteredOppList[
            Math.floor(Math.random() * filteredOppList.length)
            ];

        if (!randomExercise) {
            return {};
        }

        // Determining reps or duration based on exercise unit
        let repsOrDuraction =
            exercises[randomExercise].unit === "reps"
                ? Math.min(...SCHEMES[scheme].repRanges) +
                Math.floor(
                    Math.random() *
                    (Math.max(...SCHEMES[scheme].repRanges) -
                        Math.min(...SCHEMES[scheme].repRanges))
                ) +
                (setType === "accessory" ? 4 : 0)
                : Math.floor(Math.random() * 40) + 20;
        
        // Selecting a tempo randomly
        const tempo = TEMPOS[Math.floor(Math.random() * TEMPOS.length)];

        // Adjusting reps based on tempo to avoid exceeding 85% intensity
        if (exercises[randomExercise].unit === "reps") {
            const tempoSum = tempo
                .split(" ")
                .reduce((acc, curr) => acc + parseInt(curr), 0);
            if (tempoSum * parseInt(repsOrDuraction) > 85) {
                repsOrDuraction = Math.floor(85 / tempoSum);
            }
        } else {
            // Rounding duration to nearest 5 seconds
            repsOrDuraction = Math.ceil(parseInt(repsOrDuraction) / 5) * 5;
        }

        // Tracking included exercises
        includedTracker.push(randomExercise);

        // Returning exercise details
        return {
            name: randomExercise,
            tempo,
            rest: SCHEMES[scheme]["rest"][setType === "compound" ? 0 : 1],
            reps: repsOrDuraction,
            ...exercises[randomExercise],
        };
    });

    // Filtering out empty workout elements
    return genWOD.filter(
        (element) => Object.keys(element).length > 0
    );
}

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// Function to flatten exercises object
function exercisesFlattener(exercisesObj) {
    const flattenedObj = {}

    for (const [key, val] of Object.entries(exercisesObj)) {
        if (!("variants" in val)) {
            flattenedObj[key] = val
        } else {
            for (const variant in val.variants) {
                let variantName = variant + "_" + key
                let variantSubstitutes = Object.keys(val.variants).map((element) => {
                    return element + ' ' + key
                }).filter(element => element.replaceAll(' ', '_') !== variantName)

                flattenedObj[variantName] = {
                    ...val,
                    description: val.description + '___' + val.variants[variant],
                    substitutes: [
                        ...val.substitutes, variantSubstitutes
                    ].slice(0, 5)
                }
            }
        }
    }
    return flattenedObj
}
