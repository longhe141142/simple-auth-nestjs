import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsBoolean,
    IsOptional,
    IsObject,
    ValidateNested,
} from 'class-validator';
import {CustomValidation} from "../../../auth/dto/validation/registerValidator";
import {ValidateByConstraint} from "../../validator/validator.service";
import {
    IsUserAlreadyExistConstraint,
    IsEmailAlreadyExistConstraint,
} from '../../../module/validator/ValidatorContrait/constrait.interface';

export class CreateUserDto {
    @ValidateByConstraint(
        {
            message: 'Email $value already exists. Choose another email.',
        },
        IsEmailAlreadyExistConstraint,
    )
    @IsEmail()
    @CustomValidation.isNotBlankFormat('email')
    email: string;

    @CustomValidation.isNotBlankFormat('password')
    @IsNotEmpty()
    password: string;

    @ValidateByConstraint(
        {
            message: 'User $value already exists. Choose another name.',
        },
        IsUserAlreadyExistConstraint,
    )
    @CustomValidation.isNotBlankFormat('userName')
    @IsNotEmpty()
    userName: string;

    @IsBoolean()
    @IsOptional()
    isActive!: Boolean;

    @CustomValidation.checkPhoneNumberFormat('phone')
    @IsOptional()
    phone!: string;

    @CustomValidation.checkSocialInsurance('socialInsurance')
    @IsOptional()
    socialInsurance!: string;

    @IsOptional()
    address!: string;

    @CustomValidation.checkIdentityNumber('identityNumber')
    @IsOptional()
    identityNumber!: string;

    @IsOptional()
    updatedBy!: string

    @IsOptional()
    createdBy!: string

}
