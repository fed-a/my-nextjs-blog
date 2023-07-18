import { PostQueryResult } from '@/gql/graphql';
import { TimeUnits } from '@/types';

export interface PostContentLocalizations {
  read: string;
  timeUnits: TimeUnits;
  ago: string;
}

export type PostType = NonNullable<
  NonNullable<NonNullable<PostQueryResult['data']>['posts']>['data'][number]
>['attributes'];

export type ContentType = NonNullable<PostType>['content'];
export type ContentBlock = ContentType[number];
export type ContentBlockText = {
  __typename: 'ComponentDynamicContentText';
  id: string;
  text: string;
};
export type ContentBlockImage = {
  __typename: 'ComponentDynamicContentImage';
  id: string;
  media: {
    __typename: 'UploadFileEntityResponse';
    data: {
      __typename: 'UploadFileEntity';
      attributes: {
        name: string;
        alternativeText: string;
        formats: {
          __typename: 'MediaFormat';
          ext: string;
          url: string;
        };
        url: string;
        width: number;
        height: number;
      };
    };
  };
};
