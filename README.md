# Info

## Install

You need first to install node environment 
+ https://nodejs.org/en/
+ https://classic.yarnpkg.com/en/docs/install

And then install TypeScript environment:

```sh
yarn global add typescript ts-node
```

Finally you can get in the source code folder (the one containing this README file and install all the code specific packages):

```sh
yarn
```

## Run

After the packages are installed you should be able to run the collection code with:

```sh
ts-node index.ts
```

Inside of the `run` command (`index.ts` file, currently line 305) we can choose which dataset we want to collect.

With the following 3 structures:
+ `const sdgIndicatorListGetInfo: ISdgIndicatorListGet`
+ `const sdgIndicatorDataGetInfo: ISdgIndicatorDataGet`
+ `const sdgIndicatorPivotDataGetInfo: ISdgIndicatorPivotDataGet`

we describe what and how we want to collect the data where for the last two datasets we should specify which `indicator` we are interested in and what should be the `pageSize` of the collected dataset (ideally all the elements should be requested to avoid problem with pagination which happens to work reasonably well along the UN SDG servers limitations).

# Source

The code is available at [SDG-Open-Data-Collection](https://github.com/mprinc/SDG-Open-Data-Collection)