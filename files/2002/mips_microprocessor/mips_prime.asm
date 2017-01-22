# Find all the prime numbers between [2 and N[
#
# Programmed by Alok M. & Alex L.
# Written for our MIPS processor (only 8 instructions available)
#
# The algorithm we used is based on the Sieve of Eratosthenes.
# No assumptions are made about initial values in registers,
# except that $zero=0.
# Memory assumed to be all 00's.
# N is stored in $a0.

			addi	$a0, $zero, 50;		# Place N in $a0
			addi	$a1, $zero, 0x8000;	# BGT and marker
			addi	$s0, $zero, 1;
			addi	$s1, $zero, 4;		# Table PTR
			addi	$s2, $zero, 0;		# Final PTR
seek:			addi	$s0, $s0, 1;
			addi	$s1, $s1, 4;
			lw	$t0, 0($s1);		# Find prime
			sw	$zero, 0($s1);		# No garbage
			beq	$s0, $a0, end_prog;
			beq	$t0, $a1, not_prime;	# S0 is prime
			sw	$s0, 0($s2);
			addi	$s2, $s2, 4;
not_prime:		addi	$t3, $s0, 0;
			addi	$t4, $s1, 0;
mark_loop:		add	$t3, $t3, $s0;
			add	$t4, $t4, $s1;
			sub	$t0, $a0, $t3;		# BGT
			and	$t0, $t0, $a1;
			beq	$t0, $a1, seek;
			sw	$a1, 0($t4);
			beq	$zero, $zero, mark_loop;
end_prog:		beq	$zero, $zero, end_prog;
