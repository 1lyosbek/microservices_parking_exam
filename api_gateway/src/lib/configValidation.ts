// import * as Joi from "joi";
// import { IConfig } from "src/common/types/types";
// import { ObjectSchema } from "joi";
// import { BadRequestException } from "@nestjs/common";


// export const configSchema = Joi.object<IConfig, true>({
//     serverPort: Joi.number().required(),
//     userServerUrl: Joi.string().required(),
//     parkServerUrl: Joi.string().required(),
//     transactionServerUrl: Joi.string().required(),
//     fileServerUrl : Joi.string().required(),
// });

// export function checkDto<DTO>(schema: ObjectSchema<DTO>, dto: DTO): void {
//     const result = schema.validate(dto);

//     if (result.error) {
//         throw new BadRequestException(result.error.message);
//     }
// }
