import { assertEquals, assertNotEquals } from "https://deno.land/std@0.77.0/testing/asserts.ts";
import { loadYamlFile } from "./file_loader.ts";

Deno.test(
  'load folder',
  async () => {
    const settings = await loadYamlFile('./test_data/normal.yaml')
    assertEquals(settings.length, 1)
    assertNotEquals(settings[0], undefined)
  }
)

