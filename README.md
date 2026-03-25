aws s3 sync dist s3://narbone/cosplay/teacher

aws cloudfront create-invalidation --distribution-id E1CRXBNC4NYWJB --paths '/\*'
