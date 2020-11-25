import { assertEquals } from "https://deno.land/std@0.77.0/testing/asserts.ts"
import convert from './param_converter.ts'

Deno.test('convert plane object', () => {
  const toParam = { message: '{result}' }
  const fromResponse = { result: 'good' }
  const result = convert(toParam, fromResponse)
  assertEquals(result.message, fromResponse.result) 
})

Deno.test('convert plane object', () => {
  const toParam = { title: 'Subject is {subject}', message: '{ result }' }
  const fromResponse = { result: 'good', subject: 'test' }
  const result = convert(toParam, fromResponse)
  assertEquals(result.message, fromResponse.result) 
  assertEquals(result.title, 'Subject is ' + fromResponse.subject) 
})
