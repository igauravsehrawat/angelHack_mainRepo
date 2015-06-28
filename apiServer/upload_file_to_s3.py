import boto
from boto.s3.key import Key
import boto.s3
import uuid
import sys
#
##Do a post request also
#
import requests
__all__ = ["restful_uploader"]

def restful_uploader():
    AWS_ACCESS_KEY_ID = 'AKIAIHNJNV3BX634MAZA'
    AWS_SECRET_ACCESS_KEY = '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'

    bucket_name = AWS_ACCESS_KEY_ID.lower() + 'data-center'
    conn = boto.connect_s3(AWS_ACCESS_KEY_ID,
            AWS_SECRET_ACCESS_KEY)

    bucket = conn.create_bucket(bucket_name,
        location=boto.s3.connection.Location.DEFAULT)

    testfile = "valid_json.png"
    print 'Uploading %s to Amazon S3 bucket %s' % \
       (testfile, bucket_name)

    def percent_cb(complete, total):
        sys.stdout.write('.')
        sys.stdout.flush()

    k = Key(bucket)
    k.key = str(uuid.uuid1())+ "." +testfile.split('.')[1]
    k.set_contents_from_filename(testfile,
        cb=percent_cb, num_cb=10)
    k.set_acl('public-read')
    url = k.generate_url(expires_in=0, query_auth=False, force_http=True)
    print url

    payload = {'EventTag': 'AngelHack', 'gifImageUrl': url, 'note': 'Time is calling'}
    post_url = 'http://localhost:3000/events/gifs/558f71d4387f0e3740ab7a0f'
    r = requests.post(post_url, data=payload)
    print r.text

restful_uploader()
