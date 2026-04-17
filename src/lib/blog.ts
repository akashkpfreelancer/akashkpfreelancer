export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  readTime: number;
  tags: string[];
  excerpt: string;
  content: string;
};

export const posts: BlogPost[] = [
  {
    slug: "production-rag-that-doesnt-hallucinate",
    title: "Building a Production RAG System That Doesn't Hallucinate",
    date: "2025-03-18",
    readTime: 8,
    tags: ["RAG", "LangChain", "OpenAI", "Vector DB"],
    excerpt:
      "Most RAG tutorials show you how to get an answer. I'll show you how to get the right answer — reliably, at scale, with measurable hallucination rates under 2%.",
    content: `
<p>Every client that comes to me with a RAG project has the same problem: their prototype works great in demos but breaks in production. Answers are wrong, confidence is unwarranted, and users stop trusting the system within days.</p>

<p>After building RAG pipelines for 10+ production deployments, I've found the gaps are almost never about the LLM. They're about retrieval quality, context assembly, and a missing evaluation loop. Here's how I build systems that stay honest.</p>

<h2>The Core Problem: Retrieval ≠ Relevance</h2>

<p>The most common mistake is treating vector similarity as a proxy for relevance. It isn't. A chunk can be semantically close to a query while containing completely different information. If your retrieval step returns 5 chunks and 3 are noise, you've handed the LLM enough rope to hallucinate confidently.</p>

<p>My baseline retrieval stack for production:</p>

<pre><code>retriever = EnsembleRetriever(
    retrievers=[
        vector_store.as_retriever(search_kwargs={"k": 8}),
        bm25_retriever,                          # keyword fallback
    ],
    weights=[0.6, 0.4],
)</code></pre>

<p>The BM25 fallback is non-negotiable for queries with proper nouns, product names, or specific numeric values — domains where dense embeddings routinely miss exact matches.</p>

<h2>Context Compression Before Injection</h2>

<p>Raw chunks are expensive and noisy. Before injecting context into the prompt I run a <strong>contextual compression</strong> step that strips irrelevant sentences from each retrieved chunk:</p>

<pre><code>from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor

compressor = LLMChainExtractor.from_llm(llm)
compression_retriever = ContextualCompressionRetriever(
    base_compressor=compressor,
    base_retriever=ensemble_retriever,
)</code></pre>

<p>This typically reduces token usage by 40–60% while improving answer quality — the LLM has less noise to reason through.</p>

<h2>Grounding the Prompt</h2>

<p>The system prompt architecture matters more than most people realize. I use a three-part structure:</p>

<ol>
  <li><strong>Identity + scope</strong> — what the assistant is, what domain it covers</li>
  <li><strong>Grounding instruction</strong> — explicit instruction to answer only from provided context, and to say "I don't know" when the context doesn't support an answer</li>
  <li><strong>Citation format</strong> — require the model to cite the source chunk ID in every factual claim</li>
</ol>

<p>That last point is critical. Citations force the model to trace its answers back to source material. Any answer without a traceable source gets flagged by our evaluation layer.</p>

<h2>The Evaluation Loop You Can't Skip</h2>

<p>None of the above matters without measurement. I instrument every production RAG system with three metrics tracked per query:</p>

<ul>
  <li><strong>Context recall</strong> — did the retriever surface the chunks needed to answer correctly?</li>
  <li><strong>Answer faithfulness</strong> — does the answer contradict anything in the context?</li>
  <li><strong>Answer relevance</strong> — does the answer address what the user actually asked?</li>
</ul>

<p>I use <a href="https://docs.ragas.io" rel="noopener noreferrer" target="_blank">RAGAS</a> for automated scoring and pipe the results into a Grafana dashboard. When faithfulness drops below 0.85 on a query cluster, that cluster gets flagged for human review and the retriever config gets tuned.</p>

<h2>Results</h2>

<p>The last production system I shipped with this approach: 94% answer faithfulness on day one, 97% after two weeks of evaluation-driven tuning. Hallucination complaints from end users dropped to near zero within a month.</p>

<p>RAG is not a solved problem — but it's a solvable one if you treat evaluation as a first-class concern from day one, not an afterthought.</p>

<p>If you're building a RAG system and hitting a wall, <a href="/#contact">reach out</a>. I'm happy to do a 30-minute architecture review.</p>
    `.trim(),
  },
  {
    slug: "computer-vision-edge-deployment-lessons",
    title: "Computer Vision on the Edge: Lessons from 5 Real Deployments",
    date: "2025-04-05",
    readTime: 6,
    tags: ["Computer Vision", "PyTorch", "ONNX", "Edge AI"],
    excerpt:
      "Running CV models on edge hardware is a completely different problem from running them in the cloud. Here's what five production deployments taught me about latency, quantization, and shipping hardware AI that stays working.",
    content: `
<p>Cloud-based computer vision is straightforward: ship an image to an endpoint, get a prediction back. Edge CV is a different beast entirely. The model has to run on a Jetson, a Raspberry Pi, or a custom ASIC with hard latency requirements, no reliable internet, and hardware that doesn't get updated.</p>

<p>I've shipped CV systems for retail analytics, warehouse automation, agricultural monitoring, and industrial quality control. Here's what I learned the hard way.</p>

<h2>Start with ONNX from Day One</h2>

<p>The single decision that will save you the most time is committing to ONNX as your interchange format before you write the first line of training code. Frameworks diverge. Hardware runtimes evolve. ONNX stays stable.</p>

<pre><code>import torch

model = YOLOv8DetectionModel()
dummy_input = torch.randn(1, 3, 640, 640)

torch.onnx.export(
    model,
    dummy_input,
    "model.onnx",
    opset_version=17,
    input_names=["images"],
    output_names=["output"],
    dynamic_axes={"images": {0: "batch_size"}},
)</code></pre>

<p>From ONNX you can compile to TensorRT for Jetson, OpenVINO for Intel hardware, or CoreML for Apple Silicon — without touching your training pipeline.</p>

<h2>Quantization: INT8 or You're Not Edge-Ready</h2>

<p>FP32 inference on a Jetson Nano is almost always too slow. INT8 quantization typically delivers 3–4× speedup with accuracy loss under 1% for detection tasks if you calibrate properly.</p>

<p>The calibration dataset matters more than most people expect. I use 200–500 representative images from the target environment — not the training distribution — as the calibration set. Models calibrated on their training data hallucinate confidence on real-world edge cases.</p>

<pre><code># TensorRT INT8 calibration
trt_model = torch2trt(
    model,
    [dummy_input],
    fp16_mode=False,
    int8_mode=True,
    int8_calib_dataset=CalibrationDataset(calib_images),
    int8_calib_algorithm=trt.CalibrationAlgoType.ENTROPY_CALIBRATION_2,
)</code></pre>

<h2>Latency Budgeting Before Architecture Selection</h2>

<p>On three of my five deployments, the model was already in training before anyone had written down a latency requirement. This is backwards. The hardware and the required frames-per-second should determine your model architecture, not the other way around.</p>

<p>My process now:</p>
<ol>
  <li>Profile the target hardware (inference runtime benchmark with a dummy model)</li>
  <li>Define the latency SLA with the client (e.g. &lt;50ms per frame)</li>
  <li>Select the largest model that fits the budget, with 20% headroom for pre/post-processing</li>
  <li>Only then start training</li>
</ol>

<p>YOLOv8n runs at ~12ms on a Jetson Xavier NX. YOLOv8m runs at ~35ms. If your SLA is 40ms, you have room for YOLOv8m — but not if you haven't accounted for preprocessing (decoding, resize, normalize) which adds 5–15ms depending on resolution.</p>

<h2>The Thermal Problem Nobody Talks About</h2>

<p>Edge devices throttle under sustained load. A Jetson AGX running at full capacity in a 35°C warehouse will thermal-throttle within 20–30 minutes, dropping inference speed by 30–40%. I've seen systems that passed QA in an air-conditioned lab fail acceptance testing on the factory floor.</p>

<p>Solutions: active cooling where possible, thermal profiling at ambient temperature, and building a 25% performance buffer into your latency budget for hot environments.</p>

<h2>Monitoring on the Edge</h2>

<p>Edge devices often run in locations with intermittent connectivity. I deploy a lightweight sidecar process on every device that buffers metrics locally and syncs when connectivity is available:</p>

<ul>
  <li>Inference latency (P50, P95, P99)</li>
  <li>Detection confidence distribution (drift indicates scene change or model degradation)</li>
  <li>CPU/GPU temperature and clock frequency (thermal health)</li>
  <li>False positive rate from a sample of flagged frames sent for human review</li>
</ul>

<p>Confidence distribution drift is the early warning signal for model degradation. If the distribution shifts right (overconfident) or left (underconfident) without a corresponding ground-truth accuracy change, something has changed in the scene — lighting, camera angle, or object appearance — and the model needs retuning.</p>

<h2>What I'd Tell Myself on Deployment #1</h2>

<p>Prototype in PyTorch, export to ONNX on day one, quantize before you benchmark, and instrument everything. The models are the easy part. The hard part is keeping them working in the real world.</p>

<p>If you're planning an edge CV project, <a href="/#contact">let's talk</a>. Getting the architecture right before you start training saves weeks.</p>
    `.trim(),
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
