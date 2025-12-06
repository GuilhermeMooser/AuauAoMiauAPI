import { Module } from "@nestjs/common";
import { EnvConfigModule } from "../env-config/env-config.module";
import { EncryptionImpl } from "./encryption";

@Module({
  imports: [EnvConfigModule],
  providers: [{
    provide: 'Encryption',
    useClass: EncryptionImpl
  }],
  exports: ['Encryption']
})
export class UtilsModule {}