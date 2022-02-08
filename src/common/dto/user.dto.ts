import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsBoolean,
    IsOptional,
    IsObject,
    ValidateNested,
} from 'class-validator';
import {CustomValidation} from "../../auth/dto/validation/registerValidator";
import {ValidateByConstraint} from "../../module/validator/validator.service";
import {
    IsUserAlreadyExistConstraint,
    IsEmailAlreadyExistConstraint,
} from '../../module/validator/ValidatorContrait/constrait.interface';
import {userInformationDto} from './userInfo.dto';
import {Type} from 'class-transformer';

export class UserDto {
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
    isActive!: boolean;

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

    @IsNotEmpty()
    @IsObject()
    @ValidateNested({each: true})
    @Type(() => userInformationDto)
    userinfo: userInformationDto;
}
