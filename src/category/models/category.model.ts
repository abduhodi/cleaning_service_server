import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Post } from '../../posts/models/post.model';

@Table({ tableName: 'category' })
export class Category extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name_uz: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name_ru: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name_en: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  url: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description_uz: string;
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description_ru: string;
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description_en: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  parent_category: number;

  @BelongsTo(() => Category, {
    foreignKey: 'parent_category',
    targetKey: 'id',
    as: 'parent',
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  parent: Category;

  @HasMany(() => Post)
  posts: Post[];
}
