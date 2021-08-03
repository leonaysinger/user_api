import random


def create_valid_discounts():
    return '{}; {}; {};'.format(
        round(random.uniform(0, 500), 2),
        round(random.uniform(0, 500), 2),
        round(random.uniform(0, 500), 2)
    )


def valid_data():
    return {
        'cpf': '02189306078',
        'salary': 4500,
        'date': '2021-05-05',
        'discounts': '1250;203'
    }


def invalid_data_with_letter():
    return {
        'cpf': '02189306078',
        'salary': 4500,
        'date': '2021-05-05',
        'discounts': '1250;ABC'
    }


def invalid_data_with_special_character():
    return {
        'cpf': '02189306078',
        'salary': 4500,
        'date': '2021-05-05',
        'discounts': '1250;/***-[]'
    }


def invalid_data_with_wrong_discounts_numbers():
    return {
        'cpf': '02189306078',
        'salary': 4500,
        'date': '2021-05-05',
        'discounts': '1250;2450.52.6'
    }

