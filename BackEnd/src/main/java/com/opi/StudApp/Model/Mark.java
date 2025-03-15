package com.opi.StudApp.Model;

import lombok.Getter;

@Getter
public enum Mark {
    ONE(1), TWO(2), THREE(3), FOUR(4), FIVE(5);

    private final int value;

    Mark(int value) {
        this.value = value;
    }
}