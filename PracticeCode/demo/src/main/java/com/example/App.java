package com.example;

import java.util.PriorityQueue;
import java.util.Stack;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {

        PriorityQueue<String> priorityQueueExample = new PriorityQueue<String>(20);
        Stack<String> stackExample = new Stack<String>();
        priorityQueueExample.offer("A");
        priorityQueueExample.offer("B");
        priorityQueueExample.offer("C");
        priorityQueueExample.offer("D");


        stackExample.add("A");
        stackExample.add("B");
        stackExample.add("C");
        stackExample.add("D");

        priorityQueueExample.poll();
        // FIFO
        System.out.println(priorityQueueExample);
        // LIFO
        System.out.println(stackExample.peek());
    }
}
