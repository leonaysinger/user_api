import datetime
import re

from validate_docbr import CPF


def cpf_valid(cpf):
    """ Validate CPF"""
    cpf_instance = CPF()
    return cpf_instance.validate(cpf)


def name_valid(name):
    """ Validate name. Name must be a string without numbers"""
    return all(character.isalpha() or character.isspace() for character in name)


def date_valid(date_string, correct_date_format):
    """ Validate date. Date must be in a specific format"""
    try:
        if not isinstance(date_string, datetime.date):
            datetime.datetime.strptime(date_string, correct_date_format)
            return True
    except ValueError:
        return False
    return True


def discount_valid(discounts):
    """ Validate salary discounts. Must be a string with numbers separated by semicolon"""
    if any(item.isalpha() for item in discounts):
        return False

    string_check = re.compile('[@_!#$%^&*()<>?/}{~:,]')
    if string_check.search(discounts) is not None:
        return False

    values = discounts.split(';')
    for x in values:
        try:
            float(x)
            return True
        except ValueError:
            return False
    return True
