/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { isPattern, Patterns } from './Patterns'
import { BPN_TEST_DATA } from './testdata/bpn'
import { CITY_TEST_DATA } from './testdata/city'
import { STREET_TEST_DATA } from './testdata/street'
import { VAT_TEST_DATA } from './testdata/vat'
import { EORI_TEST_DATA } from './testdata/eori'
import { LEI_TEST_DATA } from './testdata/lei'
import { VIES_TEST_DATA } from './testdata/vies'
import { CRN_TEST_DATA } from './testdata/crn'

const validate = (data, check) => {
  data.valid.forEach((expr) => {
    expect(check(expr)).toBe(true)
  })
  data.invalid.forEach((expr) => {
    expect(check(expr)).toBe(false)
  })
}

const validatePattern = (
  country: string,
  patternType: string,
  testData: any
) => {
  it(`validates ${country} ${patternType}`, () => {
    validate(testData[country], (expr: string) =>
      isPattern(Patterns[country][patternType], expr)
    )
  })
}

describe('Input Pattern Tests', () => {
  it('validates BPN pattern', () => {
    validate(BPN_TEST_DATA.BPN, (expr: string) => isPattern(Patterns.BPN, expr))
  })
  it('validates City pattern', () => {
    validate(CITY_TEST_DATA.CITY, (expr: string) =>
      isPattern(Patterns.CITY, expr)
    )
  })
  it('validates Street pattern', () => {
    validate(STREET_TEST_DATA.STREET, (expr: string) =>
      isPattern(Patterns.STREET, expr)
    )
  })

  // EORI: Same Pattern for all countries
  validatePattern('Worldwide', 'EORI', EORI_TEST_DATA)

  // LEI: Same Pattern for all countries
  validatePattern('Worldwide', 'LEI_CODE', LEI_TEST_DATA)

  // VAT ID
  validatePattern('DE', 'VAT_ID', VAT_TEST_DATA)
  validatePattern('FR', 'VAT_ID', VAT_TEST_DATA)
  validatePattern('MX', 'VAT_ID', VAT_TEST_DATA)
  validatePattern('IN', 'VAT_ID', VAT_TEST_DATA)
  validatePattern('Worldwide', 'VAT_ID', VAT_TEST_DATA)

  // VIES: Covered by VAT ID tests

  // Commercial Registration Number
  validatePattern('DE', 'COMMERCIAL_REG_NUMBER', CRN_TEST_DATA)
  validatePattern('FR', 'COMMERCIAL_REG_NUMBER', CRN_TEST_DATA)
  validatePattern('MX', 'COMMERCIAL_REG_NUMBER', CRN_TEST_DATA)
  validatePattern('IN', 'COMMERCIAL_REG_NUMBER', CRN_TEST_DATA)
  validatePattern('Worldwide', 'COMMERCIAL_REG_NUMBER', CRN_TEST_DATA)

})
