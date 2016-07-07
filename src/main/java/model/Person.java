package model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Person {
    @JsonProperty("name")
    String name;
}