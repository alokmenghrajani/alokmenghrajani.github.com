/**
 * openssl's EVP library does not prevent you from mixing encryption & decryption functions on a given
 * ctx. This can lead to subtle bugs, where data gets decrypted but not authenticated!
 *
 * Compile and run with:
 * gcc -o openssl_wtf openssl_wtf.c -L/usr/lib/x86_64-linux-gnu/ -lssl -lcrypto
 * ./openssl_wtf
 */
#include <stdio.h>
#include <strings.h>
#include <openssl/bio.h>
#include <openssl/evp.h>

void assert(int exp, char *msg) {
  if (!exp) {
    printf("%s\n", msg);
    exit(-1);
  }
}

int main(int argc, char **argv) {
  unsigned char *key = "blah";

  unsigned char iv[] = {
    0x0d, 0x18, 0xe0, 0x6c, 0x7c, 0x72, 0x5a, 0xc9,
    0xe3, 0x62, 0xe1, 0xce
  };
  unsigned char tag[16] = { 0x00 };
  unsigned char pt1[] = {'h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd'};
  unsigned char ct[sizeof(pt1)];
  unsigned char pt2[sizeof(pt1)];
  
  EVP_CIPHER_CTX ctx;
  int ct_offset, pt2_offset, t, r;

  EVP_CIPHER_CTX_init(&ctx);

  /* Encrypt plain text */
  printf("Encrypting:\n");
  bzero(ct, sizeof(pt1));
  r = EVP_EncryptInit_ex(&ctx, EVP_aes_256_gcm(), NULL, key, iv);
  assert(r == 1, "EVP_EncryptInit_ex failed!");

  ct_offset = 0;

  r = EVP_EncryptUpdate(&ctx, ct + ct_offset, &t, pt1, sizeof(pt1));
  ct_offset += t;
  assert(r == 1, "EVP_EncryptUpdate failed!");

  r = EVP_EncryptFinal_ex(&ctx, ct + ct_offset, &t);
  ct_offset += t;
  assert(r == 1, "EVP_EncryptFinal_ex failed!");

  assert(ct_offset == sizeof(pt1), "unxpected ct len");

  /* Save tag */
  EVP_CIPHER_CTX_ctrl(&ctx, EVP_CTRL_GCM_GET_TAG, sizeof(tag), tag);
  
  EVP_CIPHER_CTX_cleanup(&ctx);

  printf("-> everything is fine, let's move on...\n\n");


  /* Decrypt the cipher text */
  printf("Decrypting, correctly:\n");
  bzero(pt2, sizeof(pt1));
  EVP_CIPHER_CTX_init(&ctx);
  
  r = EVP_DecryptInit_ex(&ctx, EVP_aes_256_gcm(), NULL, key, iv);
  assert(r == 1, "EVP_DecryptInit_ex failed!");

  EVP_CIPHER_CTX_ctrl(&ctx, EVP_CTRL_GCM_SET_TAG, sizeof(tag), tag);

  pt2_offset = 0;

  r = EVP_DecryptUpdate(&ctx, pt2 + pt2_offset, &t, ct, sizeof(ct));
  pt2_offset += t;
  assert(r == 1, "EVP_DecryptUpdate failed!");

  r = EVP_DecryptFinal_ex(&ctx, pt2 + pt2_offset, &t);
  pt2_offset += t;
  assert(r == 1, "EVP_DecryptFinal_ex failed!");

  assert(pt2_offset == sizeof(pt1), "unexpected pt2 len");

  printf("plain text: %s\n", pt2);
  for (t=0; t<sizeof(pt1); t++) {
    assert(pt1[t] == pt2[t], "pt2 != p1");
  }
  EVP_CIPHER_CTX_cleanup(&ctx);

  printf("-> everything is fine, let's move on...\n\n");


  /* Decrypt a subset */
  printf("Decrypting a subset, with EVP_EncryptInit_ex\n");
  bzero(pt2, sizeof(pt1));
  EVP_CIPHER_CTX_init(&ctx);
  
  r = EVP_EncryptInit_ex(&ctx, EVP_aes_256_gcm(), NULL, key, iv);
  assert(r == 1, "EVP_DecryptInit_ex failed!");

  EVP_CIPHER_CTX_ctrl(&ctx, EVP_CTRL_GCM_SET_TAG, sizeof(tag), tag);

  pt2_offset = 0;

  r = EVP_DecryptUpdate(&ctx, pt2 + pt2_offset, &t, ct, sizeof(ct) - 2);
  pt2_offset += t;
  assert(r == 1, "EVP_DecryptUpdate failed!");

  r = EVP_DecryptFinal_ex(&ctx, pt2 + pt2_offset, &t);
  pt2_offset += t;
  printf("plain text: %s\n", pt2);

  assert(r == 1, "EVP_DecryptFinal_ex failed!");

  EVP_CIPHER_CTX_cleanup(&ctx);

  printf("-> everything is fine, let's move on...\n\n");


  /* Decrypt a subset */
  printf("Decrypting a subset, with EVP_DecryptInit_ex\n");
  bzero(pt2, sizeof(pt1));
  EVP_CIPHER_CTX_init(&ctx);
  
  r = EVP_DecryptInit_ex(&ctx, EVP_aes_256_gcm(), NULL, key, iv);
  assert(r == 1, "EVP_DecryptInit_ex failed!");

  EVP_CIPHER_CTX_ctrl(&ctx, EVP_CTRL_GCM_SET_TAG, sizeof(tag), tag);

  pt2_offset = 0;

  r = EVP_DecryptUpdate(&ctx, pt2 + pt2_offset, &t, ct, sizeof(ct) - 2);
  pt2_offset += t;
  assert(r == 1, "EVP_DecryptUpdate failed!");

  r = EVP_DecryptFinal_ex(&ctx, pt2 + pt2_offset, &t);
  pt2_offset += t;
  printf("plain text: %s\n", pt2);

  assert(r == 1, "EVP_DecryptFinal_ex failed!");

  EVP_CIPHER_CTX_cleanup(&ctx);

  printf("-> everything is fine, let's move on...\n\n"); 
}
