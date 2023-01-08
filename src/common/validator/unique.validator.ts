import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntitySchema, FindOptionsWhere, ObjectType } from 'typeorm';

export class UniqueValidator implements ValidatorConstraintInterface {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
  }

  public async validate<E>(value: string, args: IUniqueValidationArguments<E>): Promise<boolean> {
    const [entityClass, findCondition] = args.constraints;

    return (
      (await this.dataSource.getRepository(entityClass).count({
        where: findCondition(args),
      })) <= 0
    );
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    const [entityClass] = validationArguments.constraints;
    const entity = entityClass.name || 'Entity';

    return `${entity} with the same ${validationArguments.property} already exists`;
  }

}

type UniqueValidationConstraints<E> = [
    ObjectType<E> | EntitySchema<E> | string,
  (validationArguments: ValidationArguments) => FindOptionsWhere<E>,
];

interface IUniqueValidationArguments<E> extends ValidationArguments {
  constraints: UniqueValidationConstraints<E>;
}

export function Unique<E>(
  constraints: Partial<UniqueValidationConstraints<E>>,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints,
      validator: UniqueValidator,
    });
  };
}

