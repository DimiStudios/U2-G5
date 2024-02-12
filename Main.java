public class Main{
    public static void main(String[] args) {
        int num = 5; // Puedes cambiar el número aquí para calcular su factorial
        int factorial = f(num);
        System.out.println("El factorial de " + num + " es: " + factorial);
    }

    public static int f(int n) {
        if (n == 0) {
            return 1;
        } else {
            return n * f(n - 1);
        }
    }
}