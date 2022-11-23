import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import {
  Button,
  Checkbox,
  Text,
  Stack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";

export const LandFilterSort = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.getAll("category");
  const urlSort = searchParams.getAll("sortBy");
  const urlRange = searchParams.getAll("range");

  // all filter logic
  const [category, setCategory] = useState(urlCategory || []);
  const [sortBy, setSortBy] = useState(...urlSort || "");
  const [range, setRange] = useState(urlRange || []);

  const handleCheckbox = (e) => {
    const option = e.target.value;
    let newCategory = [...category];
    if (category.includes(option)) {
      newCategory.splice(newCategory.indexOf(option), 1);
    } else {
      newCategory.push(option);
    }
    setCategory(newCategory);
  };

  useEffect(() => {
    if (category) {
      const params = {
        category,
        sortBy: searchParams.getAll("sortBy"),
        range: searchParams.getAll("range"),
      };

      setSearchParams(params);
    }
  }, [category, setSearchParams, searchParams]);

  // all sort logic

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  useEffect(() => {
    if (sortBy) {
      const params = {
        category: searchParams.getAll("category"),
        sortBy,
        range: searchParams.getAll("range"),
      };

      setSearchParams(params);
    }
  }, [sortBy, setSearchParams, searchParams]);

  // all range sorting logic

  const handleRange = (e) => {
    const option = e.target.value;
    let newRange = [...range];
    if (range.includes(option)) {
      newRange.splice(newRange.indexOf(option), 1);
    } else {
      newRange.push(option);
    }
    setRange(newRange);
  };

  useEffect(() => {
    if (range) {
      const params = {
        category: searchParams.getAll("category"),
        sortBy: searchParams.getAll("sortBy"),
        range,
      };

      setSearchParams(params);
    }
  }, [range, setSearchParams, searchParams]);

  console.log(category,  sortBy, range);
  
  return (
    <div style={{ width: "20%" }}>
      <br />

      <h3>Facility</h3>
      <Stack>
        <Checkbox
          onChange={handleCheckbox}
          value="water"
          defaultChecked={category.includes("water")}
        >
          Water
        </Checkbox>
        <Checkbox
          onChange={handleCheckbox}
          value="electricity"
          defaultChecked={category.includes("electricity")}
        >
          Electricty
        </Checkbox>
        <Checkbox
          onChange={handleCheckbox}
          value="road"
          defaultChecked={category.includes("road")}
        >
          Road
        </Checkbox>
        <Checkbox
          onChange={handleCheckbox}
          value="sewerage"
          defaultChecked={category.includes("sewerage")}
        >
          Sewerage
        </Checkbox>
      </Stack>
      <br />

      <h3>Sort by price</h3>
      <RadioGroup onChange={setSortBy} >
        <Stack>
          <Radio onChange={handleSort} value="LTH" defaultChecked={sortBy == "LTH"}>
            Low to High
          </Radio>
          <Radio onChange={handleSort} value="HTL" defaultChecked={sortBy == "HTL"}>
            High to Low
          </Radio>
        </Stack>
      </RadioGroup>
      <br />

      <h3>Select range</h3>
      <Stack>
        <Checkbox
          onChange={handleRange}
          value="1to5"
          defaultChecked={range.includes("1to5")}
        >
          1L to 5L
        </Checkbox>
        <Checkbox
          onChange={handleRange}
          value="5to15"
          defaultChecked={range.includes("5to15")}
        >
          5L to 15L
        </Checkbox>
        <Checkbox
          onChange={handleRange}
          value="15to25"
          defaultChecked={range.includes("15to25")}
        >
          15L to 25L
        </Checkbox>
        <Checkbox
          onChange={handleRange}
          value="25to50"
          defaultChecked={range.includes("25to50")}
        >
          25L to 50L
        </Checkbox>
        <Checkbox
          onChange={handleRange}
          value="50andabove"
          defaultChecked={range.includes("50andabove")}
        >
          50L and above
        </Checkbox>
      </Stack>
    </div>
  );
};
