import { join } from "path";

const globalEnvLocal = join(process.cwd(), '..', '.env-local')
const globalEnv = join(process.cwd(), '..', '.env')

export const configModuleConfig = {
  envFilePath: [globalEnvLocal, globalEnv],
  isGlobal: true,
}
